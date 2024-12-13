'use client';

import React, { useState, useEffect } from 'react';
import { 
  GitBranch, ChevronRight, Copy, Check, Search 
} from 'lucide-react';
import { GitCommandCategories } from '@/data/gitCommands';
import confetti from 'canvas-confetti';
import { Progress, calculateLevel, calculateExperience, loadProgress, saveProgress } from '@/lib/progress';

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
  const [progress, setProgress] = useState<Progress>(loadProgress());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('gitProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

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

  const markCommandAsCompleted = (command: string) => {
    if (!progress.completedCommands.includes(command)) {
      const newCompletedCommands = [...progress.completedCommands, command];
      const newLevel = calculateLevel(newCompletedCommands);
      const newExperience = calculateExperience(newCompletedCommands);
      
      if (newLevel > progress.level) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      const newProgress = {
        completedCommands: newCompletedCommands,
        level: newLevel,
        experience: newExperience
      };

      setProgress(newProgress);
      saveProgress(newProgress);
    }
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

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/60 p-4 rounded-xl backdrop-blur-md border border-gray-700 hover:border-red-500 transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Niveau actuel</p>
                  {isClient && (
                    <p className="text-xl font-bold text-white">{progress.level}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/60 p-4 rounded-xl backdrop-blur-md border border-gray-700 hover:border-red-500 transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Commandes maîtrisées</p>
                  {isClient && (
                    <p className="text-xl font-bold text-white">{progress.completedCommands.length}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/60 p-4 rounded-xl backdrop-blur-md border border-gray-700 hover:border-red-500 transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Points d'expérience</p>
                  {isClient && (
                    <p className="text-xl font-bold text-white">{progress.experience}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {isClient && (
            <div className="mt-4 bg-gray-800/60 p-4 rounded-xl backdrop-blur-md border border-gray-700">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progression vers niveau {progress.level + 1}</span>
                <span>{progress.experience % 100}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress.experience % 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

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

                  <button 
                    onClick={() => markCommandAsCompleted(selectedSubCommand.fullCommand)}
                    className={`mt-4 w-full p-3 rounded-lg transition-all ${
                      progress.completedCommands.includes(selectedSubCommand.fullCommand)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                    }`}
                  >
                    {progress.completedCommands.includes(selectedSubCommand.fullCommand)
                      ? "✓ Commande maîtrisée"
                      : "J&apos;ai compris cette commande"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}