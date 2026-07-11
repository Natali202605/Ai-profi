"use client";

type ConsentCheckboxProps = {  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
};

export function ConsentCheckbox({ checked, onChange, error }: ConsentCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-border-subtle accent-gold"
      />
      <span className="text-text-secondary">
        Я соглашаюсь на{" "}
        <a href="/consent" className="text-link" target="_blank">
          обработку персональных данных
        </a>{" "}
        в соответствии с{" "}
        <a href="/privacy" className="text-link" target="_blank">
          политикой конфиденциальности
        </a>{" "}
        и принимаю условия{" "}
        <a href="/offer" className="text-link" target="_blank">
          публичной оферты
        </a>
      </span>
      {error && <p className="mt-1 text-sm text-peach">{error}</p>}
    </label>
  );
}
