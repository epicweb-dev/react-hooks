import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen, fireEvent, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../final/05'
// import {App} from '../exercise/05'

let alert = jest.spyOn(global, 'alert')
beforeAll(() => {
  alert.mockImplementation(() => {})
})

beforeEach(() => {
  alert.mockClear()
})

test('calls the onSubmitUsername handler when the submit is fired', () => {
  render(<App />)
  const input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement
  const submit = screen.getByRole('button', {name: /submit/i})

  const username = 'jenny'

  userEvent.type(input, `{selectall}${username}`)
  userEvent.click(submit)

  expect(global.alert).toHaveBeenCalledWith(`You entered: ${username}`)
  expect(global.alert).toHaveBeenCalledTimes(1)
})

// don't do this in regular tests!
const UsernameForm = App().props.children?.type

if (!UsernameForm) {
  alfredTip(
    true,
    `Can't find the UsernameForm from the exported App component. Please make sure to not edit the App component so I can find the UsernameComponent and run some tests on it.`,
  )
}

test('supports initialUsername', () => {
  render(<UsernameForm initialUsername="hannah" onSubmitUsername={() => {}} />)
  expect(
    screen.getByRole('textbox', {
      name: /username/i,
    }),
  ).toHaveValue('hannah')
})

test('validates properly', () => {
  render(<App />)
  const input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement
  const submit = screen.getByRole('button', {name: /submit/i})

  // For the extra credit where we don't display errors until blur
  // This functionality is covered in a seperate test.
  fireEvent.blur(input)

  alfredTip(
    () => {
      userEvent.type(input, `{selectall}jo`)
      // hard to assert on the specific message if they decide they want a different message
      // so we'll just assume that if it's showing up it's correct.
      expect(document.querySelector('#error-message')).toHaveTextContent(/.+/)
      userEvent.click(submit)
      expect(global.alert).not.toHaveBeenCalled()
    },
    `Make sure to display the correct error message in a div with id="error-message" when the username is too short (like in "jo") and don't allow the form to be submitted when it's invalid.`,
    {displayEl: true},
  )

  alfredTip(
    () => {
      userEvent.type(input, `{selectall}joejoejoejoe`)
      // hard to assert on the specific message if they decide they want a different message
      // so we'll just assume that if it's showing up it's correct.
      expect(document.querySelector('#error-message')).toHaveTextContent(/.+/)
      userEvent.click(submit)
      expect(global.alert).not.toHaveBeenCalled()
    },
    `Make sure to display the correct error message in a div with id="error-message" when the username is too long (like in "joejoejoejoe") and don't allow the form to be submitted when it's invalid.`,
    {displayEl: true},
  )

  alfredTip(
    () => {
      userEvent.type(input, `{selectall}Joe`)
      // hard to assert on the specific message if they decide they want a different message
      // so we'll just assume that if it's showing up it's correct.
      expect(document.querySelector('#error-message')).toHaveTextContent(/.+/)
      userEvent.click(submit)
      expect(global.alert).not.toHaveBeenCalled()
    },
    `Make sure to display the correct error message in a div with id="error-message" when the username has a capital letter (like in "Joe") and don't allow the form to be submitted when it's invalid.`,
    {displayEl: true},
  )

  alfredTip(
    () => {
      userEvent.type(input, `{selectall}joe`)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      userEvent.click(submit)
      expect(global.alert).toHaveBeenCalled()
    },
    `Make that a valid input (like "joe") does not render the alert div and clicking submit will actually submit the form.`,
    {displayEl: true},
  )
})

test('does not show the error immediately', () => {
  render(<App />)
  alfredTip(
    () => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    },
    `Make sure the error message isn't rendered to the screen before the user blurs the input`,
    {displayEl: true},
  )
  fireEvent.blur(screen.getByRole('textbox', {name: /username/i}))
  alfredTip(
    () => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    },
    `Make sure the error message is rendered to the screen after the user blurs the input`,
    {displayEl: true},
  )
})

test(`extra credit 3: shows the error when clicking submit even if the user hasn't blurred the input yet`, () => {
  render(<App />)
  const submit = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submit)
  alfredTip(
    () => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    },
    `Make sure the error message is rendered to the screen if the user clicks submit`,
    {displayEl: true},
  )
})

test('displays a useful screen reader message to inform the user of the state of the form validity', () => {
  render(<App />)
  const input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement

  fireEvent.blur(input)

  alfredTip(
    () => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    },
    `Make sure the error message has role="alert"`,
    {displayEl: true},
  )

  alfredTip(
    () => {
      expect(document.querySelector('form')?.noValidate).toBe(true)
    },
    `Make sure to add the "noValidate" attribute to the form.`,
    {displayEl: true},
  )
})

test('the username value is initialized from and saved into localStorage', () => {
  const {rerender} = render(<App />)
  let input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement
  userEvent.type(input, 'jenny')
  const lsUsername = window.localStorage.getItem('username')

  // extra credit 4 serializes the value in localStorage so there's a bit of a
  // variation here.
  const isSerialized = lsUsername === '"jenny"'
  alfredTip(
    !isSerialized && lsUsername !== 'jenny',
    `localStorage is not getting updated with the text that's typed. Be sure to call window.localStorage.setItem('username', username) in a useEffect callback that runs whenever the name changes.`,
  )

  // make sure it's initialized properly
  window.localStorage.setItem('username', isSerialized ? '"jill"' : 'jill')
  rerender(<App key="new" />)

  input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement

  alfredTip(
    input.value.includes('"'),
    `the value in localStorage is not getting deserialized properly. Make sure the value is deserialized when read from localStorage.`,
  )

  alfredTip(() => {
    expect(input).toHaveValue('jill')
  }, `the app is not initialized with the name that's in localStorage. Make sure useState is called with the value in localStorage.`)
})

test('autofocuses the input when the error is shown', () => {
  render(<App />)
  const input = screen.getByRole('textbox', {
    name: /username/i,
  }) as HTMLInputElement

  userEvent.type(input, `{selectall}jo`)
  act(() => input.blur())

  alfredTip(() => {
    expect(document.activeElement).toBe(input)
  }, `Make sure that when the error message shows up the input is focused`)
})
