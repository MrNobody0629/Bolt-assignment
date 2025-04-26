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

const getClass = async (req, res) => {
  const { className } = req.params;

  try {
    // Check cache
    const cachedClass = cache.get(`class_${className}`);
    if (cachedClass) {
    console.log("Using cached data", cachedClass);
      return res.json(cachedClass);
    }
    const response = await axios.get(`${BASE_URL}/api/classes/${className}`);
    const { name, hit_die, proficiency_choices, saving_throws } = response.data;
    const classData = { name, hit_die, proficiency_choices, saving_throws };

    // Save to cache
    cache.set(`class_${className}`, classData);
    console.log("added in cache", classData);

    res.json(classData);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Class not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch class data' });
    }
  }
}

module.exports = {
  getSummary,
  getClass
};
