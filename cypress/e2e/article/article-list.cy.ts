describe("Пользователь заходит на страницу статей", () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit("articles");
    });
  });
  it("список статей загрузился", () => {
    cy.getByTestId("ArticleList").should("exist");
    cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
  });
});
