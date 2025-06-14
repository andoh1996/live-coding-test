const sanitizeUsersData = (usersData) => {
    if (!usersData) return null;

    return {
        firstName: usersData.firstName || '',
        lastName: usersData.lastName || '',
        email: usersData.email || '',
        staffID: usersData.staffID|| '',
    };
};

module.exports = {
    sanitizeUsersData
};
