import FileDropArea from "./FileDropArea";
import DataHandler from "../helpers/data_handler";

const FileDropAreaPage = () => {
    const handler = new DataHandler();

    return (
        <div>
            <FileDropArea upload={handler.parse}/>
        </div>
    );
};

export default FileDropAreaPage;
