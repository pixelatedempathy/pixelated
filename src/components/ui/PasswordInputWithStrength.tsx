import React, { useState, forwardRef } from 'react'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'
import { Eye, EyeOff, AlertTriangle } from 'lucide-react'

interface PasswordInputWithStrengthProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
  showStrengthMeter?: boolean
  showToggleButton?: boolean
  showStrengthText?: boolean
  helperText?: string
  wrapperClassName?: string
  inputClassName?: string
  required?: boolean
}

/**
 * Enhanced password input component with strength meter
 * Provides real-time feedback on password strength with improved mobile experience
 */
export const PasswordInputWithStrength = forwardRef<
  HTMLInputElement,
  PasswordInputWithStrengthProps
>(
  (
    {
      label,
      name,
      error,
      showStrengthMeter = true,
      showToggleButton = true,
      showStrengthText = true,
      helperText,
      wrapperClassName = '',
      inputClassName = '',
      required = false,
      onChange,
      onBlur,
      value,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [valueState, setValueState] = useState('')
    const [capsLockActive, setCapsLockActive] = useState(false)

    // Use the controlled value prop if provided, otherwise use internal state
    const currentValue = typeof value === 'string' ? value : valueState

    const { strength, feedback, color } = usePasswordStrength(currentValue)

    // Handle controlled and uncontrolled input cases
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof value !== 'string') {
        setValueState(e.target.value)
      }

      if (onChange) {
        onChange(e)
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    // Add haptic feedback on mobile when typing and detect Caps Lock
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'))
      }

      if (
        'vibrate' in navigator &&
        isFocused &&
        currentValue &&
        strength === 'weak'
      ) {
        navigator.vibrate(5) // Very subtle vibration for weak passwords
      }

      if (props.onKeyDown) {
        props.onKeyDown(e)
      }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState) {
        setCapsLockActive(e.getModifierState('CapsLock'))
      }

      if (props.onKeyUp) {
        props.onKeyUp(e)
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)

      if (onBlur) {
        onBlur(e)
      }
    }

    const isShowingError = !!error

    // Determine aria-describedby value
    const getAriaDescribedBy = () => {
      if (isShowingError) {
        return `${name}-error`
      }

      const ids: string[] = []
      if (helperText) {
        ids.push(`${name}-helper`)
      }
      // Only reference strength meter if it's actually rendered (requires currentValue)
      if (showStrengthMeter && currentValue) {
        ids.push(`${name}-strength`)
      }

      return ids.length > 0 ? ids.join(' ') : undefined
    }

    return (
      <div className={`password-input-wrapper ${wrapperClassName}`}>
        <div className="form-group">
          <label htmlFor={name} className="block mb-2 font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="relative">
            <input
              ref={ref}
              id={name}
              name={name}
              type={showPassword ? 'text' : 'password'}
              className={`
                w-full p-3 border rounded
                ${isShowingError ? 'border-red-500 bg-red-50' : 'border-gray-300'}
                ${isFocused ? 'ring-2 ring-blue-300 border-blue-300' : ''}
                ${showToggleButton ? 'pr-12' : ''}
                ${inputClassName}
              `}
              value={currentValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              aria-invalid={isShowingError ? 'true' : 'false'}
              aria-describedby={getAriaDescribedBy()}
              {...props}
            />

            {showToggleButton && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-sm"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}

            {isShowingError && <div className="error-label">{error}</div>}

            {capsLockActive && !isShowingError && (
              <div
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-amber-500 flex items-center pointer-events-none"
                aria-live="polite"
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-[10px] font-bold uppercase hidden sm:inline">
                  Caps Lock
                </span>
              </div>
            )}
          </div>

          {isShowingError && (
            <div
              id={`${name}-error`}
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {error}
            </div>
          )}

          {!isShowingError && helperText && (
            <div id={`${name}-helper`} className="text-gray-500 text-xs mt-1">
              {helperText}
            </div>
          )}

          {showStrengthMeter && currentValue && (
            <>
              <div
                id={`${name}-strength`}
                className="password-strength-meter mt-2"
                role="progressbar"
                aria-valuenow={
                  strength === 'empty'
                    ? 0
                    : strength === 'weak'
                      ? 25
                      : strength === 'fair'
                        ? 50
                        : strength === 'good'
                          ? 75
                          : 100
                }
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={strength.charAt(0).toUpperCase() + strength.slice(1)}
                aria-label={`Password strength: ${strength}`}
              >
                <div
                  className={`strength-${strength}`}
                  style={{
                    backgroundColor: color,
                    width:
                      strength === 'empty'
                        ? '0%'
                        : strength === 'weak'
                          ? '25%'
                          : strength === 'fair'
                            ? '50%'
                            : strength === 'good'
                              ? '75%'
                              : '100%',
                  }}
                ></div>
              </div>

              {showStrengthText && (
                <div
                  className="password-feedback text-xs mt-1"
                  style={{ color }}
                  aria-live="polite"
                >
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  },
)

PasswordInputWithStrength.displayName = 'PasswordInputWithStrength'
