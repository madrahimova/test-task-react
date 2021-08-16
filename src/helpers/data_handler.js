class DataHandler {
    data = [];

    prepare = (data, a = new Set()) => {
        for (let key in data) {
            a.add(data[key].user);
            if (data[key].replies) {
                this.prepare(data[key].replies, a);
            }
        }
        return a;
    }

    handle = async (data, pos, count, firstCall = true) => {
        if (firstCall && ! pos) {
            this.data = Array.from(this.prepare([data])).sort();
        }
        return this.data.splice(pos, count);
    }

    send = (data, filename) => {
        fetch("http://" + window.location.host.split(":")[0] + ":6660/api/set_data",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: data, filename: filename})
            }).then(() => {
            window.location = "/participants";
        });
    }

    parse = (f) => {
        let reader = new FileReader();
        reader.readAsText(f);
        reader.onload = () => {
            try {
                this.send(JSON.parse(reader.result), f.name);
            } catch (e) {
                console.error("The file could not be parsed");
            }
        };
    }
}

module.exports = DataHandler;