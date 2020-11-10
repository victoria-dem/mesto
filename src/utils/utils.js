export function renderLoading(buttonSubmit, loading, previosValueButtonSubmit) {
  if (loading) {
    let previousValueButtonSubmit = buttonSubmit.textContent;
    buttonSubmit.textContent = "Сохранение...";
    return previousValueButtonSubmit;
  } else {
    buttonSubmit.textContent = previosValueButtonSubmit;
  }
}
