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
  return files.pilots.map((file) => {
    const ship = parseJSON(fs.readFileSync(file));

    return {
      xws: `ship:${ship.xws}`,
      name: ship.name,
      icon: ship.icon,
      size: ship.size,
      faction: ship.faction,
      pilots: ship.pilots.map((pilot) => ({
        xws: `pilot:${pilot.xws}`,
        name: pilot.name,
        caption: pilot.caption,
        initiative: pilot.initiative,
        limited: pilot.limited,
        image: pilot.image,
        artwork: pilot.artwork,
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
  const ships = prepareShips();
  const factions = prepareFactions();

  return factions.map((faction) => ({
    ...faction,
    ships: ships.filter((ship) => ship.faction === faction.name),
  }));
}

fs.writeFileSync(
  path.join(outDir, "pilots.json"),
  JSON.stringify(preparePilotCardsData(), null, 2)
);

function prepareUpgradeCardsData() {
  return files.upgrades.map((file) => {
    const types = new Set();
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

fs.writeFileSync(
  path.join(outDir, "upgrades.json"),
  JSON.stringify(prepareUpgradeCardsData(), null, 2)
);

// function prepareShips() {
//   return files.pilots.map((file) => {
//     const ship = parseJSON(fs.readFileSync(file));

//     return {
//       xws: `ship:${ship.xws}`,
//       name: ship.name,
//       icon: ship.icon,
//       size: ship.size,
//     };
//   });
// }

// function preparePilots() {
//   return files.pilots
//     .map((file) => {
//       const ship = parseJSON(fs.readFileSync(file));

//       return ship.pilots.map((pilot) => ({
//         xws: `pilot:${pilot.xws}`,
//         name: pilot.name,
//         caption: pilot.caption,
//         initiative: pilot.initiative,
//         limited: pilot.limited,
//         artwork: pilot.artwork,
//         image: pilot.image,
//       }));
//     })
//     .flat();
// }

// function prepareUpgrades() {
//   return files.upgrades
//     .map((file) => {
//       const upgrades = parseJSON(fs.readFileSync(file));

//       return upgrades[0].sides[0].type;
//     })
//     .flat();
// }

// function prepareFactions() {
//   return files.factions
//     .map((file) => {
//       const factions = parseJSON(fs.readFileSync(file));

//       return factions.map(({ xws, name, icon }) => ({
//         xws: `faction:${xws}`,
//         name,
//         icon,
//       }));
//     })
//     .flat();
// }

// fs.writeFileSync(
//   path.join(outDir, "pilots.json"),
//   JSON.stringify(preparePilots(), null, 2)
// );
// fs.writeFileSync(
//   path.join(outDir, "upgrades.json"),
//   JSON.stringify(prepareUpgrades(), null, 2)
// );

// for (let i = 0; i < directories.length; i++) {
//   const dir = path.join(basePath, directories[i]);
//   files[directories[i]] = walk(dir);
// }

// let result;

// // format factions
// for (let i = 0; i < files.factions.length; i++) {
//   const file = files.factions[i];
//   const contents = parseJSON(fs.readFileSync(file));

//   result = contents.map(({ xws, name, icon }) => ({
//     xws: `faction:${xws}`,
//     name,
//     icon,
//   }));

//   fs.writeFileSync(
//     path.join(outPath, "factions.json"),
//     JSON.stringify(result, null, 2)
//   );
// }

// // format ships
// result = [];
// for (let i = 0; i < files.pilots.length; i++) {
//   const file = files.pilots[i];
//   const contents = parseJSON(fs.readFileSync(file));

//   result.push({
//     xws: `ship:${contents.xws}`,
//     name: contents.name,
//     icon: contents.icon,
//     size: contents.size,
//     faction: parseJSON(
//       fs.readFileSync(path.resolve(outPath, "factions.json"))
//     ).find((faction) => faction.name === contents.faction),
//     pilots: contents.pilots.map((pilot) => ({
//       xws: `pilot:${pilot.xws}`,
//       name: pilot.name,
//       caption: pilot.caption,
//       initiative: pilot.initiative,
//       limited: pilot.limited,
//       artwork: pilot.artwork,
//       image: pilot.image,
//     })),
//   });
// }

// fs.writeFileSync(
//   path.join(outPath, "ships.json"),
//   JSON.stringify(result, null, 2)
// );
