import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:block relative flex items-center justify-center h-16">
            <div className="py-2 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-4">
                <div className="flex items-center space-x-4">
                  <a
                    href="/"
                    className="bg-gray-800 text-white block px-3 py-2 text-base font-medium"
                  >
                    G-Research Technical Assessment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-1 pb-2">
            <a
              href="/"
              className="bg-gray-800 text-white block px-3 py-2 text-base font-medium"
            >
              G-Research Technical Assessment
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
