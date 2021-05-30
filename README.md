#Insta NFT
The goal of the project is to automate the creation of NFT as soon as you upload something you deem worthy enough to be an NFT. In the long run, I would want to build multiple handlers which would allow users to create NFTs of their posts automatically whenever they post on any social media.

This hack showcases how users can create NFTs automatically when they add a new post on Instagram using the tag #nft.

In the future, I would like to integrate it with marketplaces so that users are able to sell their minted NFTs.

#Tech Used
The project uses the following technologies:

1. NFT.storage
2. Truffle
3. Solidity
4. IFTTT
5. AWS Lambda
6. React
7. Hasura

The goal of the application is to automate the creation of NFT when the user posts on Instagram with a specific tag. I utilized IFTTT to detect and pass image related details to a AWS Lambda hook.
The AWS lambda function downloads the image & uploads it to IPFS using NFT.storage API.
Once the image is uploaded a json metadata file is created with all the information for the NFT.

Now a check is made if the user has enough balance in the deposit contract to mint a NFT.
If they have enough funds the NFT is minted else it is stored in the queue. Based on whether the NFT was minted or not the graphql database is updated. (UI for queues is still pending)

##Lambda Function project
https://github.com/iamsahu/nftstorage
