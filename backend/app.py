from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def get_files(owner, repo):
    # Set the number of commits to retrieve for the repo
    num_commits = 500

    # Retrieve contributors information
    response = requests.get(f"https://api.github.com/repos/{owner}/{repo}/contributors")
    if response.status_code != 200:
        error_message = f"Failed to retrieve contributor information: {response.status_code}"
        return None, None, error_message

    contributors = response.json()

    # Retrieve commits information
    response = requests.get(f"https://api.github.com/repos/{owner}/{repo}/commits?per_page={num_commits}")
    if response.status_code != 200:
        error_message = f"Failed to retrieve commit information: {response.status_code}"
        return None, None, error_message

    commits = response.json()

    return contributors, commits, None

# Getting the Final Result with our Custom API
def get_final_result(contributors, commits, repo):
    results = []
    for contributor in contributors:
        commit_list = []
        contributor_scores={
            "fixing_code_scores":0,
            "refactor_code_scores":0,
            "commit_frequency_scores":0
        }
        for commit in commits:
            if commit["author"] and commit["author"]["login"] == contributor["login"]:
                commit_dict = {
                    "message": commit["commit"]["message"],
                    "date": commit["commit"]["author"]["date"],
                }
                if "fix" in commit_dict["message"].lower():
                    contributor_scores["fixing_code_scores"] += 2
                if "refactor" in commit_dict["message"].lower():
                    contributor_scores["refactor_code_scores"] += 1
                commit_list.append(commit_dict)
        
        # Calculate the commit frequency score
        commits_length = len(commit_list)
        if 0 < commits_length < 10:
            contributor_scores["commit_frequency_scores"] = 1
        elif 10 <= commits_length < 20:
            contributor_scores["commit_frequency_scores"] = 2
        elif 20 <= commits_length < 30:
            contributor_scores["commit_frequency_scores"] = 3
        elif 30 <= commits_length < 40:
            contributor_scores["commit_frequency_scores"] = 4
        elif commits_length >= 40:
            contributor_scores["commit_frequency_scores"] = 5
        
        result = {
            "repo": repo,
            "contributor": contributor["login"],
            "commits": commit_list,
            "contributor_scores": contributor_scores
        }
        results.append(result)
    return results

@app.route('/process_link')
def process_link():
    owner = request.args.get('owner')
    repo = request.args.get('repo')

    contributors, commits, error_message = get_files(owner, repo)
    if error_message:
        return jsonify({"error": error_message}), 500

    final_result = get_final_result(contributors, commits, repo)
    return jsonify(final_result)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=4000)
