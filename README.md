# Deflate CLI (Deflater)

This is an open-source CLI for deflating (or compressing) files, with the Deflate algorithm.
Specify a file, and this CLI will deflate it into a file, ending in '.zz', that should be 
quite smaller. Run the command again with the ```-r``` or ```--ratio``` flags, specifying 
the compressed filename, to print out the compression difference (in bytes) and ratio. The bigger
these figures, the more space that was saved.

## Usage 

### Via Source Control.
- Clone this repo.
- Enter this repo's directory.
- Run ```node . (flags)```. Flags are specified soon.

### Via Distributables.
- Enter the releases in this repo.
- Select the latest release.
- Download your version and run it. Remember the executables are a bit large.

**Keep in mind NPM usage is coming soon.**

# Flags and Operands
Specify the filename you want to compress, and (optionally) the output filename (by default, it is
the input filename plus .zz). You can also specify these flags:

- ```-V, --version```: Output the version number.
- ```-h, --help```: Display help for the command.

---

- ```-i, --inflate```: Inflate the input file, instead of deflating it. 
- ```-r, --ratio```: Print out the compression difference (in bytes) and ratio.