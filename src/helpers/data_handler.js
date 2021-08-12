class DataHandler {
    items = new Set();

    handle = async (data) => {
        if (!data) {
            console.error("Error during data processing");
            return null;
        }

        for (let key in data) {
            if (key === "user") {
                if (data[key] && typeof data[key] === "string") {
                    this.items.add(data[key]);
                }
            } else if (key === "replies") {
                if (data[key] && typeof data[key] === "object") {
                    data[key].map(item => this.handle(item));
                }
            }
        }
    }

    parse = async (f) => {
        try {
            let reader = new FileReader();
            reader.readAsText(f);
            reader.onload = () => this.handle(JSON.parse(reader.result));
        } catch (e) {
            console.error("The file could not be parsed");
        }
    }
}

export default DataHandler;
