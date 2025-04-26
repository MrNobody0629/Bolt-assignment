const { cache } = require("../../common/helper");
const { axios, BASE_URL } = require("../../config/config");

const getSummary = async (req, res) => {
  try {
    // Check cache
    const cachedSummary = cache.get('summary');
    if (cachedSummary) {
      return res.json(cachedSummary);
    }

    const [classesRes, spellsRes, monstersRes, featuresRes] = await Promise.all([
      axios.get(`${BASE_URL}/api/classes`),
      axios.get(`${BASE_URL}/api/spells`),
      axios.get(`${BASE_URL}/api/monsters`),
      axios.get(`${BASE_URL}/api/features`),
    ]);

    const summary = {
      total_classes: classesRes.data.count,
      total_spells: spellsRes.data.count,
      total_monsters: monstersRes.data.count,
      total_features: featuresRes.data.count,
    };

    // Save to cache
    cache.set('summary', summary);

    res.json(summary);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
}

module.exports = {
  getSummary,
};
