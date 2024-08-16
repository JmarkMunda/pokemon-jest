Feature: Searchbar Component

  Scenario: Render Searchbar
    Given the searchbar is rendered
    When the user types "hello" into the search bar
    Then the search value should display "hello"
