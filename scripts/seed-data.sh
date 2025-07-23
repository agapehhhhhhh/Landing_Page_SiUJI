#!/bin/bash

# seed-data.sh - Script untuk seeding data secara manual

set -e

echo "🌱 SIUJI Landing Page Data Seeder"
echo "================================="

# Check if backend is running
check_backend() {
    echo "🔍 Checking if backend is running..."
    
    if curl -s http://localhost:3000/api 2>/dev/null | grep -q "Payload"; then
        echo "✅ Backend is running!"
        return 0
    else
        echo "❌ Backend is not running or not accessible"
        echo "Please make sure to run: docker compose up backend"
        exit 1
    fi
}

# Run seeding
run_seeding() {
    echo "🌱 Starting data seeding process..."
    
    # Execute seeding command in backend container
    docker compose exec backend npm run seed:landing
    
    if [ $? -eq 0 ]; then
        echo "✅ Landing page data seeded successfully!"
        echo ""
        echo "🎉 You can now access:"
        echo "   - Frontend: http://localhost:8080"
        echo "   - Backend Admin: http://localhost:3000/admin"
        echo "   - API: http://localhost:3000/api"
    else
        echo "❌ Seeding failed. Please check the logs above."
        exit 1
    fi
}

# Main execution
main() {
    check_backend
    run_seeding
}

# Run if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
