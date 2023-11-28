/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.foobar',
  name: 'Delete',
  implements: ['foam.core.ContextAgent'],
  flags: ['node'],

  imports: [
    'args as parentArgs',
    'allowedDirectories',
    'console',
    'protectedDirectories'
  ],

  properties: [
    {
      name: 'fs_',
      factory: () => require('fs').promises
    },
    {
      name: 'path_',
      factory: () => require('path')
    },
    {
      class: 'String',
      name: 'path',
      required: true
    },
    {
      class: 'Boolean',
      name: 'recursive'
    },
    {
      class: 'Boolean',
      name: 'force'
    }
  ],

  methods: [
    async function execute () {
      const absPath = this.path_.resolve(this.path);
      console.log("\033[31;1mDELETING\033[0m " + absPath);
      
      // Path must be in allowed directories
      for ( const allowedDir of this.allowedDirectories ) {
        if ( this.subdirOrEq(allowedDir, this.path) ) {
          break;
        }
        throw new Error(`attempted to delete outside allowed directories: ${absPath}`);
      }
      for ( const protectedDir of this.protectedDirectories ) {
        if ( protectedDir === absPath ) {
          throw new Error(`attempted to delete protected path: ${absPath}`);
        }
      }
      // await this.fs_.rm(absPath, {
      //   recursive: this.recursive,
      //   force: this.force,
      // });
      // **
      await this.fs_.readdir(absPath, (err, files) => {
        if (err) {
          console.error(`Error reading directory: ${err}`);
          return;
        }
    
        // Filter out files that don't end with '.0'
        const filesToDelete = files.filter(file => ! file.endsWith('.0'));
    
        // Delete the remaining files
        filesToDelete.forEach(file => {
          const filePath = path.join(directoryPath, file);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${filePath}: ${err}`);
            } else {
              console.log(`Deleted: ${filePath}`);
            }
          });
        });
      });
      // **
      // this.fs_.access(directoryPath, fs.constants.F_OK, (err) => {
      //   if (err) {
      //     // 'build' directory doesn't exist, create it
      //     fs.mkdir(directoryPath, (err) => {
      //       if (err) {
      //         console.error(`Error creating directory ${directoryPath}: ${err}`);
      //         return;
      //       }
      //       console.log(`Created directory: ${directoryPath}`);
      //       this.readAndDeleteFiles(fs, path, absPath, directoryPath);
      //     });
      //   } else {
      //     // 'build' directory exists, proceed to read and delete files
      //     this.readAndDeleteFiles(fs, path, absPath, directoryPath);
      //   }
      // });
    },
    function subdirOrEq (parent, child) {
      const relPath = this.path_.relative(parent, child);
      return ! relPath.startsWith('..') && ! this.path_.isAbsolute(relPath);
    },
    function readAndDeleteFiles(fs, path, absPath, directoryPath) {
      fs.readdir(absPath, (err, files) => {
        if (err) {
          console.error(`Error reading directory: ${err}`);
          return;
        }

        // Filter out files that don't end with '.0'
        const filesToDelete = files.filter(file => !file.endsWith('.0'));

        // Delete the remaining files
        filesToDelete.forEach(file => {
          const filePath = path.join(directoryPath, file);
          fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}: ${err}`);
            } else {
                console.log(`Deleted: ${filePath}`);
            }
          });
        });
      });
    }
  ]
});
