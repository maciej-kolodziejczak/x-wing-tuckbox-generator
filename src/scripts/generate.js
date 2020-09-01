const fs = require("fs");
const path = require("path");

const basePath = path.resolve(__dirname, "..", "..", "xwing-data2", "data");
const directories = ["factions", "pilots", "upgrades"];
const outDir = path.resolve(__dirname, "..", "data");

function parseJSON(raw, ...args) {
  try {
    return JSON.parse(raw, ...args);
  } catch (err) {
    return null;
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  const result = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(dir, file);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();

    if (isDirectory) {
      result.push(...walk(fullPath));
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

const files = {};

for (let i = 0; i < directories.length; i++) {
  const dir = path.join(basePath, directories[i]);
  files[directories[i]] = walk(dir);
}

function prepareShips() {
  const factions = prepareFactions();

  return files.pilots.map((file) => {
    const ship = parseJSON(fs.readFileSync(file));
    const faction = factions.find(({ name }) => ship.faction === name).xws;

    return {
      xws: `ship:${ship.xws}`,
      name: ship.name,
      icon: ship.icon,
      size: ship.size,
      faction,
      pilots: ship.pilots.map((pilot) => ({
        xws: `pilot:${pilot.xws}`,
        name: pilot.name,
        caption: pilot.caption,
        initiative: pilot.initiative,
        limited: pilot.limited,
        image: pilot.image,
        artwork: pilot.artwork,
        faction,
        ship: `ship:${ship.xws}`,
      })),
    };
  });
}

function prepareFactions() {
  return files.factions
    .map((file) => {
      const factions = parseJSON(fs.readFileSync(file));

      return factions.map(({ xws, name, icon }) => ({
        xws: `faction:${xws}`,
        name,
        icon,
      }));
    })
    .flat();
}

function preparePilotCardsData() {
  console.log("Generating pilot cards data");

  const ships = prepareShips();
  const factions = prepareFactions();

  console.log(ships);

  return factions.map((faction) => ({
    ...faction,
    ships: ships.filter((ship) => ship.faction === faction.xws),
  }));
}

fs.writeFile(
  path.join(outDir, "pilots.json"),
  JSON.stringify(preparePilotCardsData(), null, 2),
  () => {
    console.log("data/pilots.json has been created");
  }
);

function prepareUpgradeCardsData() {
  console.log("Generating upgrade cards data");

  return files.upgrades.map((file) => {
    const contents = parseJSON(fs.readFileSync(file));
    const upgradeTypeName = contents[0].sides[0].type;

    return {
      xws: `upgradeType:${upgradeTypeName.replace(/\ /g, "-").toLowerCase()}`,
      name: upgradeTypeName,
      cards: contents.map((card) => ({
        xws: `upgrade:${card.xws}`,
        name: card.name,
      })),
    };
  });
}

fs.writeFile(
  path.join(outDir, "upgrades.json"),
  JSON.stringify(prepareUpgradeCardsData(), null, 2),
  () => {
    console.log("data/upgrade.json has been created");
  }
);
