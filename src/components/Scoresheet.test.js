import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Scoresheet from './Scoresheet';

afterEach(cleanup);

const testUpperSection = [
  'Upper1',
  'Upper2',
  'Upper3',
  'Upper4',
  'Upper5',
  'Upper6'
];

const testLowerSection = [
  'Lower1',
  'Lower2',
  'Lower3',
  'Lower4',
  'Lower5',
  'Lower6',
  'Lower7',
  'Lower8',
  'Lower9'
];

const testPlayers = ['TestPlayer'];

const testUpperScores = {
  TestPlayer: Array(6).fill('u')
};

const testLowerScores = {
  TestPlayer: Array(9).fill('l')
};

const testScoreSums = {
  TestPlayer: { upperScoreSum: 63, lowerScoreSum: 50 }
};

const testScoreSumsWithoutBonus = {
  TestPlayer: { upperScoreSum: 62, lowerScoreSum: 50 }
};

const testUiLabels = {
  SUM: 'Sum',
  TOTAL_SUM: 'Total sum'
};

const mockHandler = jest.fn();

describe('<Scoresheet/>', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Scoresheet
        players={testPlayers}
        upperScores={testUpperScores}
        lowerScores={testLowerScores}
        scoreSums={testScoreSums}
        upperSection={testUpperSection}
        lowerSection={testLowerSection}
        changeScoreValue={mockHandler}
        uiLabels={testUiLabels}
      />
    );
  });

  test('renders upper score section texts', () => {
    const elements = component.getAllByText('Upper', { exact: false });
    expect(elements).toHaveLength(6);
  });

  test('renders lower score section texts', () => {
    const elements = component.getAllByText('Lower', { exact: false });
    expect(elements).toHaveLength(9);
  });

  test('renders player names', () => {
    const element = component.getByText('TestPlayer');
    expect(element).toBeDefined();
  });

  test('renders upper scores', () => {
    const elements = component.getAllByDisplayValue('u');
    expect(elements).toHaveLength(6);
  });

  test('renders lower scores', () => {
    const elements = component.getAllByDisplayValue('l');
    expect(elements).toHaveLength(9);
  });

  test('renders upper score sum', () => {
    const element = component.getByText('63');
    expect(element).toBeDefined();
  });

  test('renders total score sum with bonus points', () => {
    const element = component.getByText('163');
    expect(element).toBeDefined();
  });

  test('renders bonus score', () => {
    const element = component.getByText('50');
    expect(element).toBeDefined();
  });

  test('renders ui labels', () => {
    const element1 = component.getByText('Sum');
    const element2 = component.getByText('Total sum');
    expect(element1).toBeDefined();
    expect(element2).toBeDefined();
  });

  test('renders total score sum without bonus points', () => {
    const componentWithoutBonus = render(
      <Scoresheet
        players={testPlayers}
        upperScores={testUpperScores}
        lowerScores={testLowerScores}
        scoreSums={testScoreSumsWithoutBonus}
        upperSection={testUpperSection}
        lowerSection={testLowerSection}
        changeScoreValue={mockHandler}
        uiLabels={testUiLabels}
      />
    );

    const element = componentWithoutBonus.getByText('112');
    expect(element).toBeDefined();
  });
});
