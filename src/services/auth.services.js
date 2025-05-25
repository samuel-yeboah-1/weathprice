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
    async signIn(credentials) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === credentials.email);

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Return user without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

}