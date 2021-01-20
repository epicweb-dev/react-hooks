import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from '../final/01.extra-4'
// import {App} from '../exercise/01'

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

if (UsernameForm.toString().includes('initialUsername')) {
  test('extra credit 1: supports initialUsername', () => {
    render(
      <UsernameForm initialUsername="hannah" onSubmitUsername={() => {}} />,
    )
    expect(
      screen.getByRole('textbox', {
        name: /username/i,
      }),
    ).toHaveValue('hannah')
  })
}

if (/(lower|\.length)/i.test(UsernameForm.toString())) {
  test('extra credit 2: validates properly', () => {
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
}

if (/showerror/i.test(UsernameForm.toString())) {
  test('extra credit 3: does not show the error immediately', () => {
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
}

if (/(role|pattern)/i.test(UsernameForm.toString())) {
  test('extra credit 4: displays a useful screen reader message to inform the user of the state of the form validity', () => {
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

    alfredTip(
      () => {
        expect(document.querySelector('form')?.name.length).toBeGreaterThan(0)
      },
      `Make sure to add the "name" attribute to the form.`,
      {displayEl: true},
    )
  })
}
