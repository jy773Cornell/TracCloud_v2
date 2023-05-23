from viewflow import flow
from viewflow.base import this, Flow
from viewflow.flow.views import CreateProcessView, UpdateProcessView

from api.models import ApplicationRecord


class SprayCardFlow(Flow):
    process_class = ApplicationRecord

    start = flow.Start(
        CreateProcessView,
        fields=["site", "crop", "chemical"]
    ).Permission(
        auto_create=True
    ).Next(this.assign)

    assign = flow.View(
        UpdateProcessView,
        fields=["assigned_to"]
    ).Permission(
        auto_create=True
    ).Next(this.complete)

    complete = flow.View(
        UpdateProcessView,
        fields=["status"]
    ).Permission(
        auto_create=True
    ).Next(this.end)

    end = flow.End()
