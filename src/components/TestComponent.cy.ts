import TestComponent from "@/components/TestComponent.vue";

describe("<TestComponent />", () => {
  // Set up some constants for the selectors
  const counterSelector = "[data-cy=counter]";
  const incrementSelector = "[aria-label=increment]";
  const decrementSelector = "[aria-label=decrement]";
  const contextSelector = "[aria-label=context]";

  it("TestingComponent should default to 0", () => {
    cy.mount(TestComponent);
    cy.get(counterSelector).should("have.text", "0");
  });

  it('supports an "initial" prop to set the value', () => {
    // Arrange
    cy.mount(TestComponent, {
      props: {
        initial: 100,
      },
    });

    // Assert
    cy.get(counterSelector).should("have.text", "100");
  });

  it("when the increment button is pressed, the counter is incremented", () => {
    // Arrange
    cy.mount(TestComponent);
    // Act
    cy.get(incrementSelector).click();
    // Assert
    cy.get(counterSelector).should("have.text", "1");
  });

  it("when the decrement button is pressed, the counter is decremented", () => {
    // Arrange
    cy.mount(TestComponent);
    // Act
    cy.get(decrementSelector).click();
    // Assert
    cy.get(counterSelector).should("have.text", "-1");
  });

  it("when clicking increment and decrement buttons, the counter is changed as expected", () => {
    cy.mount(TestComponent, { props: { initial: 100 } });
    cy.get(counterSelector).should("have.text", "100");
    cy.get(incrementSelector).click();
    cy.get(counterSelector).should("have.text", "101");
    cy.get(decrementSelector).click().click();
    cy.get(counterSelector).should("have.text", "99");
  });

  it("clicking + fires a change event with the incremented value", () => {
    // Arrange
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(TestComponent, { props: { onChange: onChangeSpy } });
    cy.get(incrementSelector).click();
    // Assert
    cy.get("@onChangeSpy").should("have.been.calledWith", 1);
  });

  // Test slot
  it("renders the context content", () => {
    cy.mount(TestComponent, { slots: { default: () => "Content" } })
      .get(contextSelector)
      .should("have.text", "Content");
  });
});
