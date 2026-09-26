import cron from 'node-cron';
import { UserData } from '../model/user.js';

// Rank update function to recalculate global and institute ranks based on score
export async function updateRanks() {
    try {
        const users = await UserData.find().sort({ score: -1, totalProblemsSolved: -1, createdAt: 1 });

        // Global rank calculation
        for (let i = 0; i < users.length; i++) {
            users[i].globalRank = i + 1;
            await users[i].save();
        }

        // Institute rank calculation
        const usersByInstitute = {};
        users.forEach(user => {
            const inst = user.institute && user.institute.trim() ? user.institute.trim() : 'Unknown';
            if (!usersByInstitute[inst]) usersByInstitute[inst] = [];
            usersByInstitute[inst].push(user);
        });

        for (const inst in usersByInstitute) {
            const group = usersByInstitute[inst];
            for (let i = 0; i < group.length; i++) {
                group[i].instituteRank = i + 1;
                await group[i].save();
            }
        }

        console.log(`[RANK UPDATE] ${new Date().toLocaleString()} - Ranks updated successfully.`);
    } catch (err) {
        console.error('[RANK UPDATE ERROR]:', err);
    }
}

// Scheduled rank update every 4 hours
cron.schedule('0 */4 * * *', async () => {
    console.log('Starting scheduled rank update...');
    await updateRanks();
}, {
    timezone: 'Asia/Kolkata'
});

// Fetch leaderboard data - strictly sorted by score descending, tiebroken by total problems solved
export async function handleLeaderBoard(req, res) {
    try {
        const usersData = await UserData.find()
            .sort({ score: -1, totalProblemsSolved: -1, createdAt: 1 })
            .select('name username institute country score totalProblemsSolved globalRank instituteRank')
            .lean();

        // Assign guaranteed ranks in case a user hasn't been indexed by cron yet
        const rankedUsers = usersData.map((user, index) => ({
            ...user,
            globalRank: user.globalRank > 0 ? user.globalRank : index + 1,
            institute: user.institute && user.institute.trim() ? user.institute.trim() : 'N/A',
            country: user.country && user.country.trim() ? user.country.trim() : 'N/A',
            score: typeof user.score === 'number' ? user.score : 0,
            totalProblemsSolved: typeof user.totalProblemsSolved === 'number' ? user.totalProblemsSolved : 0
        }));

        res.status(200).json(rankedUsers);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send("Internal Server Error");
    }
}
