let profileTestId = "";

describe("Пользователь заходит на страницу собственного профиля", () => {
  beforeEach(() => {
    cy.visit("");
    cy.login().then((data) => {
      profileTestId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileTestId);
  });
  it("профиль успешно загружается", () => {
    cy.getByTestId("ProfileCard.first").should("have.value", "nobody1221");
  });
  it("и редактирует его", () => {
    const newName = "new1221";
    const newLastname = "lastname";
    cy.updateProfile(newName, newLastname);
    cy.getByTestId("ProfileCard.first").should("have.value", newName);
    cy.getByTestId("ProfileCard.lastname").should("have.value", newLastname);
  });
});
