import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("renders previous and next buttons with correct page number", () => {
    const { getByText } = render(
      <Pagination
        currentPage={2}
        pageSize={10}
        totalCount={30}
        nextPage={() => {}}
        prevPage={() => {}}
      />
    );

    expect(getByText("Previous")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
    expect(getByText("Page 2 of 3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={30}
        nextPage={() => {}}
        prevPage={() => {}}
      />
    );

    const prevButton = getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const { getByText } = render(
      <Pagination
        currentPage={3}
        pageSize={10}
        totalCount={30}
        nextPage={() => {}}
        prevPage={() => {}}
      />
    );

    const nextButton = getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls nextPage and prevPage functions on button click", () => {
    const nextPage = jest.fn();
    const prevPage = jest.fn();

    const { getByText } = render(
      <Pagination
        currentPage={2}
        pageSize={10}
        totalCount={30}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    );

    fireEvent.click(getByText("Previous"));
    fireEvent.click(getByText("Next"));

    expect(prevPage).toHaveBeenCalledTimes(1);
    expect(nextPage).toHaveBeenCalledTimes(1);
  });
});
