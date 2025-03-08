
import React from 'react';
import { Heart, Rocket, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-1">
            <span>Created with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by Jesús David Silva Rangel</span>
            <Rocket className="h-4 w-4 ml-1 text-blue-500" />
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/in/jesusdavidsilva/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/jesussilva" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/jesussilvadev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
