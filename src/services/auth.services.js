import bcrypt from 'bcryptjs';
export const authService = {
    async signUp(userData) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Check if email already exists
        if (users.some(user => user.email === userData.email)) {
            throw new Error('Account with this email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // Create new user
        const newUser = {
            email: userData.email,
            name: userData.name,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

}