This project is a port of Trend Micro Locality Sensitive Hash published in [Github](https://github.com/trendmicro/tlsh).
It port an official Javascript version defined in https://github.com/trendmicro/tlsh/blob/master/js_ext/tlsh.js into Typescript with some code portion port from C++ version.

Usage example:
```typescript
import {Tlsh} from "tlsh_ts"

let hasher = new Tlsh()

hasher.update("Some content.")
hasher.update("Some more content.")
hasher.finale("Some more content or padding to make it at least 50 bytes long.")
let hash = hasher.hash()
console.log(hash)

let otherHasher = new Tlsh()
otherHasher.update("Some content.")
otherHasher.update("Some more content.")
otherHasher.finale("Some more content or padding to make it at least 50 bytes long.")
let otherHash = otherHasher.hash()
console.log(otherHash)

let diffScore = hasher.totalDiff(otherHasher)
console.log(diffScore) // Should be 0
```