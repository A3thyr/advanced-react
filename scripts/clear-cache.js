const path = require("path");
const fs = require("fs/promises");

const cacheFolderDir = path.resolve(__dirname, "..", "node_modules", ".cache");

(async () => {
  try {
    await fs.rm(cacheFolderDir, { force: true, recursive: true });
    console.log("cache has been deleted");
  } catch (error) {
    console.error("Error occured during rmdir:", error);
  }
})();
