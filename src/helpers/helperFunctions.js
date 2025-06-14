const otpGenerator = () => {
    const minimum = 1000;
    const maximum = 9999

    ///////generate random 4 numbers///////////////
    const otp = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

    return otp
}

module.exports = {
    otpGenerator
}