class DApp {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        // Adresse de votre contrat déployé
        this.contractAddress = "0xf11e974DF3471Fd74103F37065F354722264A42B";
        this.init();
    }

    async init() {
        try {
            // Vérifier si MetaMask est installé
            if (typeof window.ethereum !== 'undefined') {
                // Créer l'instance Web3
                this.web3 = new Web3(window.ethereum);
                
                // Demander la connexion à MetaMask
                await this.connectMetaMask();
                
                // Initialiser le contrat
                await this.initContract();
                
                // Initialiser la page courante
                this.initCurrentPage();
                
                // Écouter les changements de compte
                window.ethereum.on('accountsChanged', () => window.location.reload());
                window.ethereum.on('chainChanged', () => window.location.reload());
            } else {
                alert('Veuillez installer MetaMask pour utiliser cette application');
            }
        } catch (error) {
            console.error('Erreur d\'initialisation:', error);
        }
    }

    async connectMetaMask() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            console.log('Compte connecté:', this.account);
        } catch (error) {
            console.error('Erreur de connexion à MetaMask:', error);
        }
    }

    async initContract() {
    
        const abi = [
            [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_commodityId",
                            "type": "uint256"
                        }
                    ],
                    "name": "buyCommodity",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "commodityId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        }
                    ],
                    "name": "CommodityListed",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "commodityId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "buyer",
                            "type": "address"
                        }
                    ],
                    "name": "CommodityPurchased",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_projectId",
                            "type": "uint256"
                        }
                    ],
                    "name": "contributeToProject",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_targetAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_duration",
                            "type": "uint256"
                        }
                    ],
                    "name": "createProject",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Deposit",
                    "type": "event"
                },
                {
                    "inputs": [],
                    "name": "emergencyWithdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "projectId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "address",
                            "name": "investor",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "FundsRaised",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_location",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_price",
                            "type": "uint256"
                        }
                    ],
                    "name": "listCommodity",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "projectId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "targetAmount",
                            "type": "uint256"
                        }
                    ],
                    "name": "ProjectCreated",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "uint256",
                            "name": "projectId",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "internalType": "bool",
                            "name": "success",
                            "type": "bool"
                        }
                    ],
                    "name": "ProjectFundingCompleted",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "Withdrawal",
                    "type": "event"
                },
                {
                    "stateMutability": "payable",
                    "type": "receive"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "commodities",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "location",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isSold",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "commodityCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_commodityId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getCommodityDetails",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "price",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isSold",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "_projectId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getProjectDetails",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "targetAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amountRaised",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "projectCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "projects",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "creator",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "targetAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "amountRaised",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "deadline",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isActive",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "isFundingSuccessful",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "userBalances",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]
        ];
        this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }

    initCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('page4.html')) {
            this.initWalletPage();
        } else if (path.includes('page2.html')) {
            this.initProjectsPage();
        }
    }

    async initWalletPage() {
        const soldeElement = document.getElementById('montantSolde');
        const formDepot = document.getElementById('formDepot');
        const formRetrait = document.getElementById('formRetrait');

        // Mettre à jour le solde
        await this.updateBalance();

        // Gérer le dépôt
        formDepot?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const montant = document.getElementById('montantDepot').value;
            try {
                await this.contract.methods.depositFunds().send({
                    from: this.account,
                    value: this.web3.utils.toWei(montant, 'ether')
                });
                await this.updateBalance();
                alert('Dépôt effectué avec succès!');
            } catch (error) {
                console.error('Erreur de dépôt:', error);
                alert('Erreur lors du dépôt');
            }
        });

        // Gérer le retrait
        formRetrait?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const montant = document.getElementById('montantRetrait').value;
            try {
                await this.contract.methods.withdrawFunds(
                    this.web3.utils.toWei(montant, 'ether')
                ).send({ from: this.account });
                await this.updateBalance();
                alert('Retrait effectué avec succès!');
            } catch (error) {
                console.error('Erreur de retrait:', error);
                alert('Erreur lors du retrait');
            }
        });
    }

    async updateBalance() {
        const soldeElement = document.getElementById('montantSolde');
        if (soldeElement) {
            try {
                const balance = await this.contract.methods.getWalletBalance().call({ from: this.account });
                soldeElement.textContent = `${this.web3.utils.fromWei(balance, 'ether')} ETH`;
            } catch (error) {
                console.error('Erreur de mise à jour du solde:', error);
            }
        }
    }

    async initProjectsPage() {
        const formLeverFonds = document.getElementById('formLeverFonds');
        const listeProjets = document.getElementById('listeProjets');

        // Gérer la création de projet
        formLeverFonds?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const titre = document.getElementById('titreProjet').value;
            const description = document.getElementById('descriptionProjet').value;
            const montant = document.getElementById('montantProjet').value;

            try {
                await this.contract.methods.createProject(
                    titre,
                    description,
                    this.web3.utils.toWei(montant, 'ether')
                ).send({ from: this.account });
                alert('Projet créé avec succès!');
                await this.loadProjects();
            } catch (error) {
                console.error('Erreur de création de projet:', error);
                alert('Erreur lors de la création du projet');
            }
        });

        // Charger les projets existants
        await this.loadProjects();
    }

    async loadProjects() {
        const listeProjets = document.getElementById('listeProjets');
        if (listeProjets) {
            try {
                const projects = await this.contract.methods.getProjects().call();
                let html = '<h2>Projets Existants</h2>';
                
                projects.forEach((project, index) => {
                    const currentAmount = this.web3.utils.fromWei(project.currentAmount, 'ether');
                    const targetAmount = this.web3.utils.fromWei(project.amount, 'ether');
                    
                    html += `
                        <div class="projet-card">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <p>Objectif: ${targetAmount} ETH</p>
                            <p>Collecté: ${currentAmount} ETH</p>
                            ${project.isActive ? `
                                <form class="form-contribution" data-project-id="${index}">
                                    <input type="number" step="0.01" placeholder="Montant en ETH" required>
                                    <button type="submit">Contribuer</button>
                                </form>
                            ` : '<p class="projet-complete">Objectif atteint</p>'}
                        </div>
                    `;
                });

                listeProjets.innerHTML = html;

                // Ajouter les écouteurs d'événements pour les formulaires de contribution
                document.querySelectorAll('.form-contribution').forEach(form => {
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const projectId = e.target.dataset.projectId;
                        const amount = e.target.querySelector('input').value;

                        try {
                            await this.contract.methods.fundProject(projectId).send({
                                from: this.account,
                                value: this.web3.utils.toWei(amount, 'ether')
                            });
                            alert('Contribution effectuée avec succès!');
                            await this.loadProjects();
                        } catch (error) {
                            console.error('Erreur de contribution:', error);
                            alert('Erreur lors de la contribution');
                        }
                    });
                });
            } catch (error) {
                console.error('Erreur de chargement des projets:', error);
            }
        }
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new DApp();
});