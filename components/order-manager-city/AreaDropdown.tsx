import Select from "react-select";

interface Area {
  _id?: string;
  id?: string;
  area: string;
}

interface AreaDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Area[];
  loading?: boolean;
  accentColor: string;
}

const AreaDropdown = ({
  value,
  onChange,
  options,
  loading = false,
  accentColor,
}: AreaDropdownProps) => {
  const selectOptions = options.map((item) => ({
    value: item.area,
    label: item.area,
  }));

  const selectedOption =
    selectOptions.find((opt) => opt.value === value) || null;

  return (
    <Select
      value={selectedOption}
      onChange={(opt) => onChange(opt ? opt.value : "")}
      options={selectOptions}
      isLoading={loading}
      isSearchable
      placeholder="Please select your area"
      className="text-left"
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: "56px",
          borderRadius: "12px",
          borderColor: accentColor,
          boxShadow: state.isFocused ? `0 0 0 1px ${accentColor}` : "none",
          "&:hover": {
            borderColor: accentColor,
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#FEF3C7" : "white",
          color: state.isFocused ? accentColor : "#111827",
          cursor: "pointer",
        }),
        singleValue: (base) => ({
          ...base,
          fontWeight: 600,
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9CA3AF",
          fontWeight: 500,
        }),
      }}
    />
  );
};

export default AreaDropdown;
