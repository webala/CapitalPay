#!/bin/sh

echo "🚀 Starting CapitalPay Backend..."

# Function to wait for MongoDB to be ready
wait_for_mongo() {
    echo "⏳ Waiting for MongoDB to be ready..."
    while ! node -e "
        const mongoose = require('mongoose');
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => { console.log('✅ MongoDB is ready'); process.exit(0); })
            .catch(() => { console.log('⏳ MongoDB not ready yet...'); process.exit(1); });
    " 2>/dev/null; do
        sleep 2
    done
}

# Function to check if database is already seeded
is_seeded() {
    node -e "
        const mongoose = require('mongoose');
        const User = require('./models/User');
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(async () => {
                const userCount = await User.countDocuments();
                if (userCount > 0) {
                    console.log('✅ Database already seeded');
                    process.exit(0);
                } else {
                    console.log('🌱 Database needs seeding');
                    process.exit(1);
                }
            })
            .catch(() => {
                console.log('🌱 Database needs seeding');
                process.exit(1);
            });
    " 2>/dev/null
}

# Wait for MongoDB
wait_for_mongo

# Check if we need to seed data
if ! is_seeded; then
    echo "🌱 Seeding database with initial data..."
    npm run seed
    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully!"
    else
        echo "❌ Failed to seed database"
        exit 1
    fi
else
    echo "✅ Database already contains data, skipping seed"
fi

# Start the main application
echo "🚀 Starting the server..."
exec npm start
