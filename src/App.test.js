import { render, screen } from '@testing-library/react';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import DataHandler from "./helpers/data_handler";
import * as fs from "fs";

const getJSON = (filename) => {
  const data = fs.readFileSync("./src/test_data/" + filename);
  return JSON.parse(data);
}

test('Drop File Form Rendering', () => {
  render(<BrowserRouter>
    <App/>
  </BrowserRouter>);
  const form = screen.getByText("DROP HERE");
  expect(form).toBeInTheDocument();
});

test('JSON Data Preparing', () => {
  const handler = new DataHandler();
  const data = getJSON("comments.json")
  const result = handler.prepare([data]);
  expect(result.size).toEqual(3);
});

test('JSON Data Handling', async () => {
  const handler = new DataHandler();
  const data = getJSON("comments.json")
  const result = await handler.handle(data, 0, 10, true);
  expect(result.length).toEqual(3);
});

//...