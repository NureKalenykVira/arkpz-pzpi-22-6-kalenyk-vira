const db = require('../db'); // Підключення до бази даних

const getZones = async (req, res) => {
    try {
        console.log('Attempting to fetch zones from database...');
        const [zones] = await db.query(`
            SELECT 
                z.ZoneID, 
                z.ZoneName, 
                r.RefrigeratorID, 
                r.Name AS RefrigeratorName
            FROM Zones z
            INNER JOIN Refrigerators r ON z.RefrigeratorID = r.RefrigeratorID
        `);

        console.log('Zones fetched:', zones);

        // Групування зон за холодильниками
        const refrigerators = zones.reduce((acc, zone) => {
            const { RefrigeratorID, RefrigeratorName, ZoneID, ZoneName } = zone;

            if (!acc[RefrigeratorID]) {
                acc[RefrigeratorID] = {
                    id: RefrigeratorID,
                    name: RefrigeratorName,
                    zones: [],
                };
            }

            acc[RefrigeratorID].zones.push({
                id: ZoneID,
                name: ZoneName,
            });

            return acc;
        }, {});

        const response = Object.values(refrigerators);
        console.log('Response prepared:', response);

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching zones:', error.message);
        res.status(500).json({ message: 'Error fetching zones.', error: error.message });
    }
};

module.exports = { getZones };
