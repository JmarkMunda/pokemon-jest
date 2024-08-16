Feature: Card Component

  Scenario: Render Card Component
    Given the card is rendered
    Then it should display a card component

  Scenario: Render Card Component with Children
    Given the card is rendered with children elements
    Then it should display the children inside the TouchableOpacity
