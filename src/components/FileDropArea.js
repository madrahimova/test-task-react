import React from "react";
import "../App.css";

class FileDropArea extends React.Component {
    state = {
        drag: false
    }

    dragIn = (e) => {
        e.preventDefault();
        this.setState({drag: true});
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            e.target.classList.add("fd-area_drag-in");
        }
    }

    dragOut = (e) => {
        e.preventDefault();
        this.setState({drag: false});
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            e.target.classList.remove("fd-area_drag-in");
        }
    }

    drag = (e) => {
        e.preventDefault();
        if (this.state.drag) {
            e.target.classList.add("fd-area_drag-in");
        }
        else {
            e.target.classList.remove("fd-area_drag-in");
        }
    }

    drop = (e) => {
        e.preventDefault();
        e.target.classList.remove("fd-area_drag-in");
        if (!this.props.upload) {
            console.error("Upload handler is not specified");
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.upload(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    }

    render() {
        return (
            <div className="fd-area_container">
                <div className="fd-area"
                    onDrop={this.drop}
                    onDragLeave={this.dragOut}
                    onDragEnter={this.dragIn}
                    onDragOver={this.drag}>
                    DROP HERE
                </div>
            </div>
        );
    }
}

export default FileDropArea;
