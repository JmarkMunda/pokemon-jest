Feature: Loading Component

  Scenario: Render Loading Component with default props
    Given the loading spinner is rendered
    Then it should display an ActivityIndicator with default props

  Scenario: render Loading Component with custom props
    Given the loading spinner is rendered with a custom color of red and size large
    Then it should display an ActivityIndicator with color red and size large
