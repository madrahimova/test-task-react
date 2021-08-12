const generate = async (count = 0,  maxDepth = count, root = {}, depth = 0) => {
    if (depth >= maxDepth) {
        return "data";
    }
    for (let i = 0; i < count; i++) {
        root[i] = await generate(count, maxDepth, root[i], depth + 1);
    }
    return root;
}

export default generate;
