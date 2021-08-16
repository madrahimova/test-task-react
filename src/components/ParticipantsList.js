import React from "react";

const DEFAULT_LOAD_COUNT = 30;
let LOAD_COUNT = DEFAULT_LOAD_COUNT;

class ParticipantsList extends React.Component {
    state = {
        title: "",
        participants: [],
        loadCount: 0,
        loading: false
    }

    list = React.createRef();

    componentDidMount() {
        this.reset();
        this.loadData(0, LOAD_COUNT);
    }

    setLoading = (loading) => {
        this.setState({
            title: this.state.title,
            participants: this.state.participants,
            loadCount: this.state.loadCount,
            loading: loading
        })
    }

    reset = () => {
        this.setState({
            title: "",
            participants: [],
            loadCount: 0,
            loading: false
        })
    }

    loadData = (pos, count) => {
        this.setLoading(true);
        fetch("http://" + window.location.host.split(":")[0] + ":6660/api/get_data", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({pos: pos, count: count})
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    title: data.filename,
                    participants: this.state.participants.concat(data.data),
                    loadCount: pos + Math.min(count, data.data.length),
                    loading: false
                })
                this.setLoading(false);
            })
            .catch(error => {
            });
    }

    deleteItem = (index) => {
        let participants = this.state.participants;
        participants.splice(index, 1);
        this.setState({
            title: this.state.title,
            participants: participants,
            loadCount: participants.length,
            loading: false
        });
    }

    trackScroll = () => {
        if (this.isBottom(this.list.current)) {
            this.loadData(this.state.loadCount, LOAD_COUNT);
        }
    }

    isBottom = (e) => {
        return e.scrollTop + e.offsetHeight >= e.scrollHeight;
    }

    render() {
        const Loading = () => {
            if (this.state.loading) {
                return <div className="loading">Loading...</div>
            } else {
                return null;
            }
        }
        const Line = () => {
            if (this.state.loadCount > 0 && this.state.loadCount < DEFAULT_LOAD_COUNT) {
                return <span className="pl_item__last"/>
            } else {
                return null;
            }
        }

        return (
            <div className={"container center"}>
                <div className="wrapper box center">
                    <div className="pl_header">{this.state.title}</div>
                    <div className="wrapper pl" ref={this.list} onScroll={this.trackScroll}>
                        {this.state.participants.map((item, index) =>
                            <div className="pl_item" key={index}>
                                <div>{index + ": "+ item}</div>
                                <button onClick={() => {
                                    this.deleteItem(index);
                                }}>X
                                </button>
                            </div>)}
                        <Line/>
                    </div>
                    <Loading loading={this.state.loading}/>
                </div>
            </div>
        )
    }
}

export default ParticipantsList;
