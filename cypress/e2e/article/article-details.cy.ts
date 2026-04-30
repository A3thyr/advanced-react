let currentArticleId = "";

describe("Пользователь заходит на страницу статьи", () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it("содержимое статьи загрузилось", () => {
    cy.getByTestId("ArticleDetails.Info").should("exist");
  });
  it("список рекомендаций загрузился", () => {
    cy.getByTestId("ArticleRecommendationsList").should("exist");
  });
  it("и отправляет комментарий", () => {
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("AddCommentForm").scrollIntoView();
    cy.addComment("text");
    cy.getByTestId("CommentCard.Content").should("have.length", 1);
  });
  it("и ставит оценку", () => {
    cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(5, "feedback");
    cy.get("[data-selected=true]").should("have.length", 5);
  });
  it("и ставит оценку(со стабами на фикстурах)", () => {
    cy.intercept("GET", "**/articles/*", { fixture: "article-details.json" });
    cy.getByTestId("ArticleDetails.Info");
    cy.getByTestId("RatingCard").scrollIntoView();
    cy.setRate(5, "feedback");
    cy.get("[data-selected=true]").should("have.length", 5);
  });
});
