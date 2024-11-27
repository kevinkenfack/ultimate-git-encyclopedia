export const GitCommandCategories = [
    {
      category: 'Configuration',
      commands: [
        {
          command: 'git config',
          subCommands: [
            {
              fullCommand: 'git config --global user.name "[nom]"',
              description: 'Définit votre nom global pour Git',
              detailedExplanation: 'Configure votre identité pour tous les dépôts Git. Utilisé pour tracker les commits à travers tous vos projets.',
              example: 'git config --global user.name "Votre Nom"',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git config --global user.email "[email]"',
              description: 'Définit votre email global pour Git',
              detailedExplanation: 'Configure votre email pour l\'identification lors des commits. Important pour la traçabilité dans les projets collaboratifs.',
              example: 'git config --global user.email "example@domain.com"',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git config --list',
              description: 'Liste tous les paramètres Git',
              detailedExplanation: 'Affiche toutes les configurations Git actuelles, locales et globales.',
              example: 'git config --list',
              difficulty: 'Débutant'
            }
          ]
        }
      ]
    },
    {
      category: 'Création et Initialisation',
      commands: [
        {
          command: 'git init',
          subCommands: [
            {
              fullCommand: 'git init',
              description: 'Initialise un nouveau dépôt Git',
              detailedExplanation: 'Crée un nouveau dépôt Git local dans le répertoire courant. Commence le suivi de version et crée un dossier .git caché pour stocker les métadonnées.',
              example: 'Dans un dossier de projet: git init',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git init --bare',
              description: 'Crée un dépôt nu (serveur)',
              detailedExplanation: 'Crée un dépôt sans répertoire de travail, généralement utilisé comme dépôt central ou serveur distant.',
              example: 'git init --bare /chemin/depot-serveur.git',
              difficulty: 'Avancé'
            }
          ]
        },
        {
          command: 'git clone',
          subCommands: [
            {
              fullCommand: 'git clone [url]',
              description: 'Clone un dépôt distant',
              detailedExplanation: 'Télécharge intégralement un projet depuis un dépôt distant, incluant toute son historique de versions et branches.',
              example: 'git clone https://github.com/utilisateur/projet.git',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git clone --depth=1 [url]',
              description: 'Clone uniquement les derniers commits',
              detailedExplanation: 'Effectue un clonage "shallow" pour récupérer uniquement les dernières modifications et économiser de l\'espace disque.',
              example: 'git clone --depth=1 https://github.com/utilisateur/projet.git',
              difficulty: 'Intermédiaire'
            }
          ]
        }
      ]
    },
    {
      category: 'Modifications et Commits',
      commands: [
        {
          command: 'git add',
          subCommands: [
            {
              fullCommand: 'git add [fichier]',
              description: 'Ajoute des fichiers à l\'index',
              detailedExplanation: 'Prépare les modifications pour un commit. Permet de choisir précisément quels fichiers seront inclus dans le prochain commit.',
              example: 'git add fichier.txt ou git add .',
              difficulty: 'Débutant'
            }
          ]
        },
        {
          command: 'git commit',
          subCommands: [
            {
              fullCommand: 'git commit -m "[message]"',
              description: 'Enregistre les modifications',
              detailedExplanation: 'Capture un instantané des modifications actuelles avec un message descriptif. Crée un point de sauvegarde dans l\'historique du projet.',
              example: 'git commit -m "Ajout de la nouvelle fonctionnalité"',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git commit --amend',
              description: 'Modifie le dernier commit',
              detailedExplanation: 'Permet de modifier le message du dernier commit ou ajouter des modifications oubliées sans créer un nouveau commit.',
              example: 'git commit --amend -m "Nouveau message de commit"',
              difficulty: 'Intermédiaire'
            }
          ]
        }
      ]
    },
    {
      category: 'Synchronisation',
      commands: [
        {
          command: 'git fetch',
          subCommands: [
            {
              fullCommand: 'git fetch',
              description: 'Récupère les modifications depuis le dépôt distant',
              detailedExplanation: 'Télécharge les nouvelles branches et commits du dépôt distant sans les fusionner avec votre branche locale.',
              example: 'git fetch',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git fetch origin',
              description: 'Récupère les modifications d\'un dépôt spécifique',
              detailedExplanation: 'Télécharge les branches et commits spécifiques depuis le dépôt "origin" configuré.',
              example: 'git fetch origin',
              difficulty: 'Intermédiaire'
            }
          ]
        },
        {
          command: 'git pull',
          subCommands: [
            {
              fullCommand: 'git pull',
              description: 'Récupère et fusionne les modifications d’un dépôt distant.',
              detailedExplanation: 'La commande "git pull" combine "git fetch" et "git merge" pour récupérer les modifications depuis le dépôt distant configuré pour la branche courante et les fusionner avec la branche locale.',
              example: 'git pull',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git pull origin main',
              description: 'Récupère les modifications de la branche principale depuis le dépôt distant.',
              detailedExplanation: 'Cette commande spécifie le dépôt distant ("origin") et la branche ("main") pour récupérer les dernières modifications et les fusionner avec la branche courante.',
              example: 'git pull origin main',
              difficulty: 'Intermédiaire'
            }
          ]
        },
        {
          command: 'git push',
          subCommands: [
            {
              fullCommand: 'git push',
              description: 'Envoie les modifications vers le dépôt distant',
              detailedExplanation: 'Publie les commits locaux vers le dépôt distant associé à la branche courante.',
              example: 'git push',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git push origin main',
              description: 'Envoie les modifications vers une branche spécifique',
              detailedExplanation: 'Cette commande publie les modifications locales sur la branche "main" du dépôt "origin".',
              example: 'git push origin main',
              difficulty: 'Intermédiaire'
            }
          ]
        }
      ]
    }
  ];
  