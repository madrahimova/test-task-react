const generate = (count = 0, maxDepth = count,
                  root = {}, depth = 0, index = 0) => {

    const random = "user" + (1 + Math.random() * count);
    if (depth >= maxDepth) {
        return {user: random};
    }

    root = {user: random, replies: []};
    for (let i = 0; i < count; i++) {
        index++;
        root.replies.push(generate(count, maxDepth, root, depth + 1, index));
    }

    return root;
}

console.log(JSON.stringify(generate(100000, 1)));
module.exports = generate;
