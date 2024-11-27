'use client';

import React, { useState } from 'react';
import { 
  GitBranch, ChevronRight, Copy, Check, Search 
} from 'lucide-react';
import { GitCommandCategories } from '@/data/gitCommands';

type SubCommand = {
  fullCommand: string;
  description: string;
  detailedExplanation: string;
  example: string;
  difficulty: string;
};

type Command = {
  command: string;
  subCommands: SubCommand[];
};

type Category = {
  category: string;
  commands: Command[];
};

export default function UltimateGitCommandEncyclopedia() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [selectedSubCommand, setSelectedSubCommand] = useState<SubCommand | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(GitCommandCategories);

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = GitCommandCategories.filter(category => 
      category.commands.some(cmd => 
        cmd.command.toLowerCase().includes(term.toLowerCase()) ||
        cmd.subCommands.some(subCmd => 
          subCmd.fullCommand.toLowerCase().includes(term.toLowerCase()) ||
          subCmd.description.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 
          className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 animate-pulse tracking-wide"
          role="img" 
          aria-label="Dark moon and octopus"
        >
          🌑 Apprenez git facilement 🐙
        </h1>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <input 
            type="text" 
            placeholder="Rechercher des commandes Git..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="grid md:grid-cols-4 gap-4 sm:gap-8">
          {/* Categories */}
          <div className="bg-gray-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
              <GitBranch className="inline mr-2" /> Catégories
            </h2>
            {filteredCategories.map((category, index) => (
              <button 
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedCommand(null);
                  setSelectedSubCommand(null);
                }}
                className={`w-full text-left p-2 sm:p-3 rounded-lg mb-2 transition-all duration-300 group ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-red-900 to-pink-900 text-white' 
                    : 'hover:bg-gray-800 text-gray-300 hover:translate-x-2'
                }`}
              >
                <span className="flex items-center justify-between">
                  {category.category}
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
            ))}
          </div>

          {/* Commandes de la Catégorie */}
          <div className="bg-gray-900/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl">
            {selectedCategory ? (
              <>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                  {selectedCategory.category}
                </h3>
                {selectedCategory.commands.map((cmd, index) => (
                  <div key={index} className="mb-4">
                    <button 
                      onClick={() => {
                        setSelectedCommand(cmd);
                        setSelectedSubCommand(null);
                      }}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-300 group ${
                        selectedCommand === cmd 
                          ? 'bg-gradient-to-r from-red-900 to-pink-900 text-white' 
                          : 'hover:bg-gray-800 text-gray-300 hover:translate-x-2'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <code className="text-base sm:text-lg">{cmd.command}</code>
                        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-gray-600 py-16 animate-pulse">
                <p>Sélectionnez une catégorie</p>
              </div>
            )}
          </div>

          {/* Sous-commandes et Détails */}
          <div className="md:col-span-2 bg-gray-900/60 backdrop-blur-md p-4 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl">
            {selectedCommand ? (
              <div>
                {selectedCommand.subCommands.map((subCmd, index) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedSubCommand(subCmd)}
                    className={`cursor-pointer p-3 sm:p-4 rounded-lg mb-4 transition-all duration-300 group ${
                      selectedSubCommand === subCmd 
                        ? 'bg-gradient-to-r from-red-900 to-pink-900' 
                        : 'hover:bg-gray-800 hover:translate-x-2'
                    }`}
                  >
                    <code className="text-base sm:text-lg text-green-400 block mb-2 group-hover:text-green-300 transition-colors">
                      {subCmd.fullCommand}
                    </code>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{subCmd.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-16 animate-pulse">
                <p>Sélectionnez une commande</p>
              </div>
            )}

            {selectedSubCommand && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                    Détails de la Commande
                  </h4>
                  <button 
                    onClick={() => handleCopyCommand(selectedSubCommand.fullCommand)}
                    className="hover:bg-red-900/50 p-2 rounded-full transition-all group"
                  >
                    {copiedCommand === selectedSubCommand.fullCommand ? (
                      <Check className="text-green-500 scale-125 animate-ping" />
                    ) : (
                      <Copy className="text-gray-500 group-hover:text-white transition-colors" />
                    )}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-2">
                      Explication Détaillée
                    </h5>
                    <p className="text-gray-300">
                      {selectedSubCommand.detailedExplanation}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-2">
                      Exemple
                    </h5>
                    <code className="text-green-400 block bg-gray-800 p-2 rounded-lg">
                      {selectedSubCommand.example}
                    </code>
                  </div>

                  <div className="flex items-center">
                    <span className="mr-3 text-gray-500">Difficulté :</span>
                    {[...Array(3)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`mx-1 text-2xl ${
                          i < ['Débutant', 'Intermédiaire', 'Avancé'].indexOf(selectedSubCommand.difficulty) 
                            ? 'text-red-500' 
                            : 'text-gray-700'
                        }`}
                      >
                        ●
                      </span>
                    ))}
                    <span className="ml-3 text-gray-400 font-medium">
                      {selectedSubCommand.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}