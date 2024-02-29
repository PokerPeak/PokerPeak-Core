  <div align="center">

  ![logo2](https://github.com/PokerPeak/PokerPeak-Core/assets/115649011/fdd6c5f0-68d5-4822-94bd-672fca60d04e)

  <p>
    <strong>Where skill meets true randomness - harnessing the power of AP13 Airnode RNG for an unbeatable blockchain poker experience.</strong>
  </p>
<p></p>
</div>
</br>
<center>
Welcome to our online poker 🎉 featuring 52 decks, where the server acts as the dealer 🤖 responsible for shuffling and distributing cards to players 🃏. Each game room accommodates up to six players 👥, with multiple rooms initialized by the server 🚀. Room dealers have the authority to set entry fees 💰 for participating players, adding an extra layer of excitement! Players can enjoy an authentic poker experience with options to fold, call, and raise, mirroring real-life gameplay 🎲. Get ready to bluff, strategize, and win big! 💪🏼
</center>

  ### Game Implementation 🧑‍💻
The game is implemented using a pseudo-state machine architecture on a smart contract. In this pseudo-state machine, the game transitions between different states, each opening up possibilities for specific functions to be called. This architecture ensures a structured and dynamic gameplay experience.

### Use Of ApI3's QRNG
For true randomness in shuffling cards in our poker game, we decided to utilize apI3 QRNG and an Affine Cipher.

### State Emission 🌟 

What sets this game apart is its continuous state emission. On each state change, the game emits its current state. These emitted states are observed by a server, allowing real-time updates. This crucial information is then seamlessly presented to all connected users, creating an immersive and synchronized gaming environment.

### Transaction-based Gameplay 💸

The game loop kicks off when server initiates a transaction to the smart contract. This transaction triggers a series of events ( generating random number,shuffeling the deck, emmiting the shuffeled deck(encrypted)): the state change is emitted, observed by the server, and relayed to all connected players. The loop continues as users interact with the game, making transactions that, in turn, update the game's state and keep the server and players in sync.

The seamless flow of transactions, state emissions, and server updates continues until the game reaches its completion.

## Some Sneak Peak of poker gameplays 👀✨

Project update images!.

![image](https://github.com/priyanshu-7938/ENCODE_lightlink/assets/115649011/3a0b89d5-e1aa-4240-ad57-c755d9f9de29)

![image](https://github.com/priyanshu-7938/ENCODE_lightlink/assets/115649011/32c19397-7679-4486-952c-6894c18c6a54)

![image](https://github.com/priyanshu-7938/ENCODE_lightlink/assets/115649011/1d0a51c5-688b-4bd7-84a9-b3e2297e961a)
## Architecture

For the artitecture, 
A feedback loop where the game actual state is maintained on the chain, the users change the state (i.e. make txn for game) ,then these state change are recorded on server and a second state is maintained on server, Also the state is relayed to the users. and this go's on wntill game ends.

For the specific details , like how the deck is created and how the cards are maintinaned private till the end of the game!

Card Serurity:
  a encrypted deck is posted to contract which be used by the game. Shuffles the deck then emits a event containing "array which correspondes to specific (6) users.".
  on server side these cords are stored and then decrypted then given to users, Later as the game ends the private key to decrypt the cards are posted to contract!

  * even if the server is maleious(acting wrong) it can't give diffrent cards, as the encrypted cards which are corresponds to cards are allready on chain "Imutabilility of cards." 
Key Feature:
  The way The Entropy protocall worrks, similarly this game contract is designed so that, untill one of the party is fair the game will be fair, here in our contract the Contract is itself one of the Party, and the contract behavior is known an fair so this whole game works...( by the way, the second pary here is server, which relays the information.)

The Possestion of funds isunder user itself, and along with the immutability using contract,and eventually the waiting time does indeed gets large ,well thats mke the game more intresting( keeping the players on the edgs!!)
This Problem can be eassiely cleared by using a high throttle chains, intended for gaming!.
![The basic working artitecture!](https://github.com/priyanshu-7938/ENCODE_lightlink/blob/master/WhatsApp%20Image%202024-01-20%20at%2013.28.36_4c138b1a.jpg?raw=true)

## Card Creation Process (Poker Hands Game)

For a fair gameplay. we developed a precise mechnism to genrate and maintainn the generated deck on chainn it self, Here's a concise overview:

### 1. Deck Shuffling

At the game's inception, a shuffled deck is randomly generated, establishing the foundation for a dynamic and unpredictable card distribution.

### 2. Key Generation

A set of private and public keys is generated to facilitate secure encryption and decryption processes.

### 3. Card Encryption

The generated deck is encrypted using the public key, ensuring that card details remain confidential until revealed during gameplay.

### 4. Posting to Contract

The encrypted cards are posted to the smart contract, initiating the decentralized gameplay process.

### 5. On-chain Reshuffling

Using a generated random number and Affine cryptic mapping, the cards are reshuffled on-chain, introducing a layer of randomness that is Quantum and "can't be pridicted".

### 6. Card Emission

The reshuffled cards are emitted, and their states are observed on the server. These emitted cards are later decrypted and forwarded to respective users.


## Features

- _Feature 1: Allows ownership of assets of user to them self by, allowing payment of required bets /and call during the game itself.
- _Feature 2: Immutability : by recording and emmiting the state changes on every stage of game (checkout the Contracts/contract/PokerRoom.sol for emits.)
- _Feature 3: the generated deck it totally unpredictable and the game is fair ,given that the server maintains the private key and keeps it a secret.

## Progress Till Now
  the game (mechanism/ psuedo state machine)contract is completed and working😝! Checkout the deployed demo contract on     https://pegasus.lightlink.io/address/0x719A03ae0122cC82621C9a863bdF49D93d419687 ::lightlink pegesis testnet::.
  The fronntend is under development
  And same for the server fro the game.

## Future Goals
1. Achieve full responsiveness in the UI design.
2. Ensure compatibility with the Ethereum Virtual Machine (EVM).
3. Enable individuals to serve as dealers and host their own game rooms.
4. Implement a stable token system for rewarding users and facilitating in-game transactions.
5. Integrate a secure and efficient matchmaking system to enhance player experience.

# Team Members


- Priyanshu Soni
- Mohammed Saad
