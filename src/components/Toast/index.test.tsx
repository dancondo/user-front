import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Toast from "./";

const mockNotification: NotificationDto = {
  id: 1,
  title: "title",
  type: "success",
  message: "message",
};

const mockOnClose = jest.fn();

describe("Test toast component", () => {
  it("renders toast component with message and text", () => {
    const { container } = render(
      <Toast notification={mockNotification} onClose={mockOnClose} />
    );

    expect(container.textContent).toBe(
      `${mockNotification.title}${mockNotification.message}`
    );
  });

  it("should call on close callback on click", () => {
    const { getByLabelText } = render(
      <Toast notification={mockNotification} onClose={mockOnClose} />
    );
    fireEvent.click(
      getByLabelText("close")
    );
    expect(mockOnClose).toBeCalled();
  });
});
