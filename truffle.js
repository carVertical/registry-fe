module.exports = {
  networks: {
    development: {
        host: "35.158.194.23",
        port: 7545,
        from: "0x1232c4f0b72c867ca8eb2ca52a0ba13ea5e16a83",// mnemonic: one two three four five
        network_id: "*"
    },
    aws: {
      host: "54.194.138.161",
      port: 8545,
      from: "0x2611a2a8489b104be82d31f5dc4118a5af1eaa69",
      network_id: "4"
    },
    local: {
      host: "localhost",
      port: 8545,
      from: "0x79f17ef469eff7fd51a28de840cc6bab2e4b5b0d",
      network_id: "*"
    }
  }
};
