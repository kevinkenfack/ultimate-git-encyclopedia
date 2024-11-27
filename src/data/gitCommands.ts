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
              example: 'git config --global user.email "kenfack@ntexemple.com"',
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
              example: 'git add fichier.txt  ou  git add .',
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
      category: 'Branches et Fusion',
      commands: [
        {
          command: 'git branch',
          subCommands: [
            {
              fullCommand: 'git branch [nom-branche]',
              description: 'Crée une nouvelle branche',
              detailedExplanation: 'Crée une nouvelle branche basée sur la branche courante. Ne bascule pas automatiquement sur la nouvelle branche.',
              example: 'git branch fonctionnalite-x',
              difficulty: 'Débutant'
            },
            {
              fullCommand: 'git branch -d [nom-branche]',
              description: 'Supprime une branche',
              detailedExplanation: 'Supprime la branche spécifiée. Ne supprimera pas une branche non fusionnée sauf avec -D.',
              example: 'git branch -d fonctionnalite-x',
              difficulty: 'Intermédiaire'
            }
          ]
        },
        {
          command: 'git merge',
          subCommands: [
            {
              fullCommand: 'git merge [branche]',
              description: 'Fusionne une branche avec la branche courante',
              detailedExplanation: 'Intègre l\'historique d\'une autre branche dans la branche courante. Peut nécessiter la résolution de conflits.',
              example: 'git merge fonctionnalite-x',
              difficulty: 'Intermédiaire'
            }
          ]
        }
      ]
    }
  ];