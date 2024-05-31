// rust.ts
import { plugin, type BunPlugin } from "bun";
import { dlopen, FFIType, suffix } from "bun:ffi";

const { i32, cstring } = FFIType;

const myPlugin: BunPlugin = {
  name: "RustPlugin",
  setup(build) {
    build.onLoad(
      {
        filter: /\.rs$/,
      },
      (args) => {
        Bun.spawnSync(["cargo", "build", "--release"], {
          env: process.env,
        });

        // get rust file name
        const filename = args.path.split("/").pop()!.split(".")[0];

        console.log("path", filename)
        const path = `target/release/lib${filename}.${suffix}`;

        const lib = dlopen(path, {
          // Define functions interface here
          add_numbers: {
            args: [i32, i32],
            returns: i32,
          },
        });


        return {
          exports: lib.symbols,
          loader: "object",
        };
      },
    );
  },
};

plugin(myPlugin);
