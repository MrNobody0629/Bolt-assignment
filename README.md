# Bolt-assignment

## Requirements
- Node.js v22.x

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/MrNobody0629/Bolt-assignment.git
cd Bolt-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Add .env file on root directory and add following variables

```
PORT = 4000
BASE_URL = 'https://www.dnd5eapi.co'
```

4. Run the project in development mode:
```bash
npm run start:dev
```

Or run stage/prod:
```bash
npm run start:stage
npm run start:prod
```

Server will start at `http://localhost:4000` if port added as mentioned in env example

## API Endpoints

### 1. To Check server health
**Request:**
```bash
curl --location 'http://localhost:4000/health'
```

**Response:**
```response will be
Bolt server is up and running
```

### 2. Get Summary
**Request:**
```bash
curl --location 'http://localhost:4000/api/v1/summary'
```

**Response:**
```example json
{
  "total_classes": 1,
  "total_spells": 2,
  "total_monsters": 3,
  "total_features": 4
}
```

### 3. Get Class Details
**Request:**
```bash
curl --location 'http://localhost:4000/api/v1/classes/ranger'
```

**Response:**
```example json
{
  "name": "Wizard",
  "hit_die": 6,
  "proficiency_choices": [...],
  "saving_throws": [...]
}
```

## Notes
- Basic in-memory caching is implemented to reduce repeated API calls.
- Ensure your Node version is 22.x for compatibility.